terraform {
  backend "azurerm" {
    resource_group_name  = "terraform-state"
    storage_account_name = "radsoftterraformstate"
    container_name       = "state"
    key                  = "radekmaziarka.test.terraform.tfstate"
  }
}

provider "azurerm" {
  version = "=2.2.0"
  features {}
}

provider "cloudflare" {
  version = "~> 2.0"
}

provider "azuredevops" {
  version = ">= 0.0.1"
}

provider "azuread" {
  version = "=0.7.0"
}

provider "random" {
}


data "cloudflare_zones" "default" {
  filter {
    name   = "radekmaziarka.pl"
    status = "active"
    paused = false
  }
}
