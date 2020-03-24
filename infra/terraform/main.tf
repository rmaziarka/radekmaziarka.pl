provider "azurerm" {
  # whilst the `version` attribute is optional, we recommend pinning to a given version of the Provider
  version = "=2.2.0"
  features {}
}

terraform {
  backend "azurerm" {
    resource_group_name  = "terraform-state"
    storage_account_name = "radsoftterraformstate"
    container_name       = "state"
    key                  = "radekmaziarka.test.terraform.tfstate"
  }
}

resource "azurerm_resource_group" "default" {
  name     = "radekmaziarka-test"
  location = "West Europe"
}

resource "azurerm_storage_account" "default" {
  name                     = "radekmaziarkateststorage"
  resource_group_name      = azurerm_resource_group.default.name
  location                 = azurerm_resource_group.default.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  account_kind             = "StorageV2"
  static_website {
    index_document = "index.html"
  }
}

resource "azurerm_cdn_profile" "default" {
  name                = "radekmaziarka-test"
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name
  sku                 = "Standard_Verizon"
}

resource "azurerm_cdn_endpoint" "default" {
  name                = "radekmaziarka-test"
  profile_name        = azurerm_cdn_profile.default.name
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name

  origin {
    name      = "radekmaziarka-test"
    host_name = "${azurerm_storage_account.default.name}.z6.web.core.windows.net"
  }

  origin_host_header  = "${azurerm_storage_account.default.name}.z6.web.core.windows.net"
}

resource "azurerm_dns_zone" "default" {
  name                = "test.radekmaziarka.pl"
  resource_group_name = azurerm_resource_group.default.name
}


resource "azurerm_public_ip" "default" {
  name                = "radekmaziarka-test"
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name
  allocation_method   = "Dynamic"
  ip_version          = "IPv4"
}

resource "azurerm_dns_a_record" "default" {
  name                = "@"
  zone_name           = azurerm_dns_zone.default.name
  resource_group_name = azurerm_resource_group.default.name
  ttl                 = 300
  target_resource_id  = azurerm_public_ip.default.id
}

resource "azurerm_dns_cname_record" "default" {
  name                = "test.radekmaziarka.pl"
  zone_name           = azurerm_dns_zone.default.name
  resource_group_name = azurerm_resource_group.default.name
  ttl                 = 300
  record              = "radekmaziarka-test.azureedge.net"
}