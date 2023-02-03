using Pulumi;
using Pulumi.AzureNative.Resources;
using Pulumi.AzureNative.Storage;
using Pulumi.AzureNative.Storage.Inputs;
using Pulumi.AzureNative.Web;
using Pulumi.AzureNative.Web.Inputs;

return await Pulumi.Deployment.RunAsync(() =>
{
    var resourceGroupName = "radekmaziarka";
    var prodResourceGroupName = resourceGroupName + "-prod";
    var prodResourcesName = prodResourceGroupName;
    var prodStorageAccountName = resourceGroupName + "prod";
    var location = "West Europe";
    
    var resourceGroup = new ResourceGroup(prodResourceGroupName, new ResourceGroupArgs()
    {
        ResourceGroupName = prodResourceGroupName,
        Location = location,
    });

    var storageAccount = new StorageAccount(prodStorageAccountName, new StorageAccountArgs
    {
        AccountName = prodStorageAccountName,
        ResourceGroupName = resourceGroup.Name,
        Location = location,
        Sku = new SkuArgs
        {
            Name = SkuName.Standard_LRS
        },
        Kind = Kind.StorageV2
    });
    
    var staticSite = new StaticSite(prodResourcesName, new()
    {
        Name = prodResourcesName,
        ResourceGroupName = resourceGroup.Name,
        Location = location,
        BuildProperties = new StaticSiteBuildPropertiesArgs
        {
            ApiLocation = "",
            AppArtifactLocation = "",
            AppLocation = "",
        },
        Sku = new SkuDescriptionArgs
        {
            Name = "Free",
            Tier = "Free",
        },
    });
    
});