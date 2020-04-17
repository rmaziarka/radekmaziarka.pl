variable "resource_group_name" {
  type = string
}

variable "storage_account_name" {
  type = string
}

variable "blog_domain" {
  type = string
}

variable "azure_devops_application_name" {
  type = string
}

variable "dependency_flag"{
  type = string
}

variable "service_endpoint_name"{
  type = string
}

data "azuredevops_projects" "default" {
    project_name = "radekmaziarka.pl"
}

locals {
  azure_devops_project_id = data.azuredevops_projects.default.projects.*.project_id[0]
}

data "azurerm_client_config" "default" {
}

data "azurerm_subscription" "default" {
}