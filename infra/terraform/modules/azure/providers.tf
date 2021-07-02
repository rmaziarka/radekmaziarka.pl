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

    azuredevops = {
      source = "microsoft/azuredevops"
      version = "0.1.5"
    }
    
    time = {
      source = "hashicorp/time"
      version = "0.7.2"
    }
  }
}
