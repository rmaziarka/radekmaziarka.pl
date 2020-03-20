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

resource "azurerm_storage_container" "default" {
  name                  = "content"
  storage_account_name  = azurerm_storage_account.default.name
  container_access_type = "private"
}