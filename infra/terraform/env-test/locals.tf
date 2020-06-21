locals {
  resource_group_name           = "radekmaziarka-test"
  storage_account_name          = "radekmaziarkateststorage"
  blog_domain                   = "test.radekmaziarka.pl" 
  azure_devops_application_name = "radsoft-radekmaziarka-test"
  service_endpoint_name         = "radekmaziarka-test"
}

locals {
  storage_account_verify_address = "asverify.${local.storage_account_name}.blob.core.windows.net"
}

locals {
  cloudflare_zone_id = data.cloudflare_zones.default.zones[0].id  
  cloudflare_zone_radblog_id = data.cloudflare_zones.radblog.zones[0].id
}