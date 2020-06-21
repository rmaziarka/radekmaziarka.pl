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

resource "cloudflare_record" "redirect_record_radblog" {
  zone_id = local.cloudflare_zone_radblog_id
  name    = "test"
  value   = "192.0.0.1"
  type    = "A"
  proxied = true
  ttl     = 1
}

resource "cloudflare_page_rule" "radblog" {
  zone_id = local.cloudflare_zone_radblog_id
  target = "*test.radblog.pl/*"
  priority = 1

  actions {
    forwarding_url {
      url = "https://test.radekmaziarka.pl/$2"
      status_code = 301
    }
  }
}