
terraform {
  backend "azurerm" {
    resource_group_name  = "terraform-state"
    storage_account_name = "radsoftterraformstate"
    container_name       = "state"
    key                  = "radekmaziarka.test.terraform.tfstate"
  }
}

provider "azurerm" {
  version = "=2.2.0"
  features {}
}

provider "cloudflare" {
  version = "~> 2.0"
  // email and key stored as environment variables
}

// Azure

resource "azurerm_resource_group" "default" {
  name     = "radekmaziarka-test"
  location = "West Europe"
}

resource "azurerm_storage_account" "default" {
  name                      = "radekmaziarkateststorage"
  resource_group_name       = azurerm_resource_group.default.name
  location                  = azurerm_resource_group.default.location
  account_tier              = "Standard"
  account_replication_type  = "LRS"
  account_kind              = "StorageV2"
  enable_https_traffic_only = false
  static_website {
    index_document = "index.html"
  }
}

resource "azurerm_cdn_profile" "default" {
  name                = "radekmaziarka-test"
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name
  sku                 = "Standard_Verizon"
}

resource "azurerm_cdn_endpoint" "default" {
  name                = "radekmaziarka-test-endpoint"
  profile_name        = azurerm_cdn_profile.default.name
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name

  origin {
    name      = "radekmaziarka-test"
    host_name = "${azurerm_storage_account.default.name}.z6.web.core.windows.net"
  }

  origin_host_header  = "${azurerm_storage_account.default.name}.z6.web.core.windows.net"
}


// Cloudflare
resource "cloudflare_zone" "default" {
    zone = "radekmaziarka.pl"
}

resource "cloudflare_zone_settings_override" "default" {
  zone_id = cloudflare_zone.default.id

  settings {
    automatic_https_rewrites = "on"
  }
}

resource "cloudflare_record" "radekmaziarka_1" {
  zone_id = cloudflare_zone.default.id
  name    = "@"
  value   = "91.219.122.12"
  type    = "A"
  ttl     = 3600
}

resource "cloudflare_record" "radekmaziarka_2" {
  zone_id = cloudflare_zone.default.id
  name    = "@"
  value   = "194.88.154.187"
  type    = "A"
  ttl     = 3600
}

resource "cloudflare_record" "test_radekmaziarka" {
  zone_id = cloudflare_zone.default.id
  name    = "test"
  value   = "radekmaziarka-test-endpoint.azureedge.net"
  type    = "CNAME"
  proxied = false
  ttl     = 3600
}

resource "cloudflare_record" "test_mx_10_1" {
  zone_id = cloudflare_zone.default.id
  name    = "test"
  value   = "mail1.webio.pl"
  type    = "MX"
  priority = "10"
}

resource "cloudflare_record" "test_mx_10_2" {
  zone_id = cloudflare_zone.default.id
  name    = "test"
  value   = "mail2.webio.pl"
  type    = "MX"
  priority = "10"
}

resource "cloudflare_record" "test_mx_10_3" {
  zone_id = cloudflare_zone.default.id
  name    = "test"
  value   = "mail3.webio.pl"
  type    = "MX"
  priority = "10"
}

resource "cloudflare_record" "test_mx_90_1" {
  zone_id = cloudflare_zone.default.id
  name    = "test"
  value   = "mailoffsite.webio.pl"
  type    = "MX"
  priority = "90"
}

resource "cloudflare_record" "test_mail_txt" {
  zone_id = cloudflare_zone.default.id
  name    = "test"
  value   = "v=spf1 a mx ptr ip4:194.88.154.129/26 ip4:31.41.209.34 -all"
  type    = "TXT"
}
