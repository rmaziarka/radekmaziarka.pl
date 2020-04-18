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

resource "azuredevops_serviceendpoint_github" "default" {
	project_id            = azuredevops_project.default.id
	service_endpoint_name = "rmaziarka"
  description           = ""
    
  auth_personal {
      personal_access_token = var.github_personal_access_token
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