
resource "azurerm_resource_group" "default" {
  name     = var.resource_group_name
  location = "West Europe"
}

resource "azurerm_storage_account" "default" {
  name                      = var.storage_account_name
  resource_group_name       = azurerm_resource_group.default.name
  location                  = azurerm_resource_group.default.location
  account_tier              = "Standard"
  account_replication_type  = "LRS"
  account_kind              = "StorageV2"
  enable_https_traffic_only = false
  static_website {
    index_document = "index.html"
  }
  custom_domain {
    name          = var.blog_domain
    use_subdomain = false
  }
}

resource "azurerm_storage_blob" "robots" {
  name                   = "robots.txt"
  storage_account_name   = azurerm_storage_account.default.name
  storage_container_name = "$web"
  type                   = "Block"
  source                 = "${path.cwd}/robots.txt"

}

resource "azuread_application" "azure_devops" {
  name = var.azure_devops_application_name
}

resource "azuread_service_principal" "azure_devops" {
  application_id = azuread_application.azure_devops.application_id
}

resource "azurerm_role_assignment" "azure_devops_contributor" {
  scope                = azurerm_resource_group.default.id
  role_definition_name = "Contributor"
  principal_id         = azuread_service_principal.azure_devops.id
}

resource "azurerm_role_assignment" "azure_devops" {
  scope                = azurerm_storage_account.default.id
  role_definition_name = "Storage Blob Data Contributor"
  principal_id         = azuread_service_principal.azure_devops.id
}

resource "time_rotating" "azure" {
  rotation_days = 365
}

resource "random_password" "azure_devops" {
  length = 32
  special = true
  override_special = "_%@"
  
  keepers = {
    expiry = time_rotating.azure.rotation_rfc3339
  }
}

resource "azuread_service_principal_password" "azure_devops" {
  service_principal_id = azuread_service_principal.azure_devops.id
  value                = random_password.azure_devops.result
  end_date              = time_rotating.azure.rotation_rfc3339

}

resource "azuread_application_password" "azure_devops" {
  application_object_id = azuread_application.azure_devops.id
  value                 = random_password.azure_devops.result
  end_date              = time_rotating.azure.rotation_rfc3339

  lifecycle {
    ignore_changes = [
      value,
      end_date_relative
    ]
  }
}

resource "azuredevops_serviceendpoint_azurerm" "azure_devops" {
  project_id                = local.azure_devops_project_id
  service_endpoint_name     = var.service_endpoint_name
    credentials {
    serviceprincipalid  = azuread_application.azure_devops.application_id
    serviceprincipalkey = random_password.azure_devops.result
  }

  azurerm_spn_tenantid      = data.azurerm_client_config.default.tenant_id
  azurerm_subscription_id   = data.azurerm_client_config.default.subscription_id
  azurerm_subscription_name = data.azurerm_subscription.default.display_name
  description               = "${var.blog_domain} service connection"
}

output storage_account_web_host {
  value = azurerm_storage_account.default.primary_web_host
}