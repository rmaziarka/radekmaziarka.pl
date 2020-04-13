terraform {
  backend "azurerm" {
    resource_group_name  = "terraform-state"
    storage_account_name = "radsoftterraformstate"
    container_name       = "state"
    key                  = "radekmaziarka.prod.terraform.tfstate"
  }
}

provider "azurerm" {
  version = "=2.2.0"
  features {}
}

provider "cloudflare" {
  version = "~> 2.0"
}