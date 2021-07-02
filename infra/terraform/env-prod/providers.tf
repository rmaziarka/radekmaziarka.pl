terraform {
  backend "azurerm" {
    resource_group_name  = "terraform-state"
    storage_account_name = "radsoftterraformstate"
    container_name       = "state"
    key                  = "radekmaziarka.prod.terraform.tfstate"
  }
}

terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "2.66.0"
    }

    azuread = {
      source = "hashicorp/azuread"
      version = "1.6.0"
    }

    cloudflare = {
      source = "cloudflare/cloudflare"
      version = "2.23.0"
    }

    azuredevops = {
      source = "microsoft/azuredevops"
      version = "0.1.5"
    }

    random = {
      source = "hashicorp/random"
      version = "3.1.0"
    }
    
    time = {
      source = "hashicorp/time"
      version = "0.7.2"
    }
  }
}

provider "azurerm" {
  features {}
}

provider "cloudflare" {
   email      = "maziarka.radoslaw@outlook.com"
}

provider "azuredevops" {
}

provider "azuread" {
}

provider "random" {
}

provider "time" {
}


data "cloudflare_zones" "default" {
  filter {
    name   = "radekmaziarka.pl"
    status = "active"
    paused = false
  }
}

data "cloudflare_zones" "radblog" {
  filter {
    name   = "radblog.pl"
    status = "active"
    paused = false
  }
}
