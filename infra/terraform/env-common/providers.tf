terraform {
  backend "azurerm" {
    resource_group_name  = "terraform-state"
    storage_account_name = "radsoftterraformstate"
    container_name       = "state"
    key                  = "radekmaziarka.commong.terraform.tfstate"
  }
}

provider "cloudflare" {
  version = "~> 2.0"
}