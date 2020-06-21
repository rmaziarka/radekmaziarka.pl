resource "cloudflare_record" "verify_address_record" {
  zone_id = local.cloudflare_zone_id
  name    = "asverify"
  value   = local.storage_account_verify_address
  type    = "CNAME"
  proxied = false
  ttl     = 3600
}

module "azure"{
  source = "../modules/azure"
  
  resource_group_name           = local.resource_group_name
  storage_account_name          = local.storage_account_name
  blog_domain                   = local.blog_domain
  azure_devops_application_name = local.azure_devops_application_name
  service_endpoint_name         = local.service_endpoint_name
  // needed to wait for a cloudflare record
  dependency_flag      = cloudflare_record.verify_address_record.id
}

// wait for the moving to Azure
# resource "cloudflare_record" "redirect_record" {
#   zone_id = local.cloudflare_zone_id
#   name    = "@"
#   value   = module.azure.storage_account_web_host
#   type    = "CNAME"
#   proxied = true
#   ttl     = 1
# }

resource "cloudflare_record" "radekmaziarka_1" {
  zone_id = local.cloudflare_zone_id
  name    = "@"
  value   = "91.219.122.12"
  type    = "A"
  ttl     = 3600
}

resource "cloudflare_record" "radekmaziarka_2" {
  zone_id = local.cloudflare_zone_id
  name    = "@"
  value   = "194.88.154.187"
  type    = "A"
  ttl     = 3600
}

resource "cloudflare_record" "radblog_1" {
  zone_id = local.cloudflare_zone_radblog_id
  name    = "@"
  value   = "91.219.122.12"
  type    = "A"
  ttl     = 3600
}

resource "cloudflare_record" "radblog_2" {
  zone_id = local.cloudflare_zone_radblog_id
  name    = "@"
  value   = "194.88.154.187"
  type    = "A"
  ttl     = 3600
}
