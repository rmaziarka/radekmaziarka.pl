locals {
  resource_group_name  = "radekmaziarka-prod"
  storage_account_name = "radekmaziarkaprodstorage"
  blog_domain          = "radekmaziarka.pl" 
}

locals {
  storage_account_verify_address = "asverify.${local.storage_account_name}.blob.core.windows.net"
}

locals {
  cloudflare_zone_id = data.cloudflare_zones.default.zones[0].id
}