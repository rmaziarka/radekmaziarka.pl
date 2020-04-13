module "azure"{
  source = "../modules/azure"
  
  resource_group_name  = "radekmaziarka-prod"
  storage_account_name = "radekmaziarkaprodstorage"
  blog_domain          = "radekmaziarka.pl"
}