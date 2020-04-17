resource "cloudflare_record" "verify_address_record" {
  zone_id = local.cloudflare_zone_id
  name    = "asverify.test"
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

resource "cloudflare_record" "redirect_record" {
  zone_id = local.cloudflare_zone_id
  name    = "test"
  value   = module.azure.storage_account_web_host
  type    = "CNAME"
  proxied = true
  ttl     = 1
}