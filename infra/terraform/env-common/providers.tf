terraform {
  backend "azurerm" {
    resource_group_name  = "terraform-state"
    storage_account_name = "radsoftterraformstate"
    container_name       = "state"
    key                  = "radekmaziarka.common.terraform.tfstate"
  }
}
provider "azurerm" {
  version = "= 2.6"
  features {}
}

provider "cloudflare" {
  version = "~> 2.0"
}

provider "azuredevops" {
  version = ">= 0.0.1"
}