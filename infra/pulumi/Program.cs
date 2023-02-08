using Pulumi;
using Pulumi.AzureNative.Resources;
using Pulumi.AzureNative.Storage;
using Pulumi.AzureNative.Storage.Inputs;
using Pulumi.AzureNative.Web;
using Pulumi.AzureNative.Web.Inputs;
using Pulumi.AzureNative.Network;

void CreateCommonResources(string resourceGroupNameBase, string location)
{
    var commonResourceGroupName = resourceGroupNameBase + "-common";
    var dnsZoneName = "radekmaziarka.pl";
    var commonResourceGroup = new ResourceGroup(commonResourceGroupName, new ResourceGroupArgs()
    {
        ResourceGroupName = commonResourceGroupName,
        Location = location,
    });

    var dnsZone = new Zone(dnsZoneName, new()
    {
        ResourceGroupName = commonResourceGroup.Name,
        Location = "global"
    });
}

void CreateProdResources(string resourceGroupNameBase, string location)
{
    var prodResourceGroupName = resourceGroupNameBase + "-prod";
    var prodResourcesName = prodResourceGroupName;
    var prodStorageAccountName = resourceGroupNameBase + "prod";


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
            Name = Pulumi.AzureNative.Storage.SkuName.Standard_LRS
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
}

return await Pulumi.Deployment.RunAsync(() =>
{
    var resourceGroupName = "radekmaziarkapl";
    var location = "West Europe";
    
    CreateCommonResources(resourceGroupName, location);

    CreateProdResources(resourceGroupName, location);
});