
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
  custom_domain {
    name = "test.radekmaziarka.pl"
    use_subdomain = true
  }
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
  value   = "radekmaziarkateststorage.z6.web.core.windows.net"
  type    = "CNAME"
  proxied = true
  ttl     = 1
}

resource "cloudflare_record" "verify_test_radekmaziarka" {
  zone_id = cloudflare_zone.default.id
  name    = "asverify.test"
  value   = "asverify.radekmaziarkateststorage.z6.web.core.windows.net"
  type    = "CNAME"
  ttl     = 1
}

