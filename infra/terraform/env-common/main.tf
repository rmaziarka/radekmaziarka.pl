resource "cloudflare_zone" "default" {
    zone = "radekmaziarka.pl"
}

resource "cloudflare_zone_settings_override" "default" {
  zone_id = cloudflare_zone.default.id

  settings {
    automatic_https_rewrites = "on"
  }
}

resource "azuredevops_project" "default" {
  project_name       = "radekmaziarka.pl"
  description        = ""
  visibility         = "private"
  version_control    = "Git"
  work_item_template = "Agile"
}

// due to auth_oath type this needs to be imported rather than created
// service endpoints with personal tokens can be created, but they don't use Azure Pipeline application and you need to create build hook on your own
resource "azuredevops_serviceendpoint_github" "default" {
	project_id            = azuredevops_project.default.id
	service_endpoint_name = "rmaziarka"
  description           = ""
    
  auth_oath {
    oauth_configuration_id = var.oauth_configuration_id
  }
}

resource "azuredevops_build_definition" "default" {
  project_id = azuredevops_project.default.id
  name       = "radekmaziarka.pl"
  path       = "\\"

  repository {
    repo_type             = "GitHub"
    repo_name             = "rmaziarka/radekmaziarka.pl"
    service_connection_id = azuredevops_serviceendpoint_github.default.id
    branch_name           = "master"
    yml_path              = "/infra/ci-cd/pipeline.yaml"
  }
}