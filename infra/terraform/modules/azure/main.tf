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
    name = var.blog_domain
  }
}