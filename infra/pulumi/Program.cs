using Pulumi;
using Pulumi.AzureNative.Resources;
using Pulumi.AzureNative.Storage;
using Pulumi.AzureNative.Web;
using Pulumi.AzureNative.Web.Inputs;
using Pulumi.AzureNative.Network;
using Pulumi.AzureNative.Insights;


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
        ZoneName = dnsZoneName,
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
        Sku = new Pulumi.AzureNative.Storage.Inputs.SkuArgs
        {
            Name = Pulumi.AzureNative.Storage.SkuName.Standard_LRS
        },
        Kind = Pulumi.AzureNative.Storage.Kind.StorageV2
    });


    var container = new BlobContainer("shop-products", new BlobContainerArgs
    {
        ContainerName = "shop-products",
        AccountName = storageAccount.Name,
        PublicAccess = PublicAccess.None,
        ResourceGroupName = resourceGroup.Name,
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
    
    var appServicePlan = new AppServicePlan(prodResourcesName, new AppServicePlanArgs
    {
        ResourceGroupName = resourceGroup.Name,
        Name = prodResourcesName,
        Kind = "Linux",
        Sku = new SkuDescriptionArgs
        {
            Tier = "Dynamic",
            Name = "Y1"
        },
        Reserved = true
    });
    
    var appInsights = new Component(prodResourcesName, new ComponentArgs
    {
        ResourceName = prodResourcesName,
        ApplicationType = ApplicationType.Web,
        Kind = "web",
        ResourceGroupName = resourceGroup.Name,
    });
    
    var functionApp = new WebApp(prodResourcesName, new WebAppArgs
    {
        Kind = "FunctionApp",
        Name = prodResourcesName,
        ResourceGroupName = resourceGroup.Name,
        ServerFarmId = appServicePlan.Id,
        SiteConfig = new SiteConfigArgs
        {
            AppSettings = new[]
            {
                new NameValuePairArgs{
                    Name = "AzureWebJobsStorage",
                    Value = GetConnectionString(resourceGroup.Name, storageAccount.Name),
                },
                new NameValuePairArgs{
                    Name = "FUNCTIONS_EXTENSION_VERSION",
                    Value = "~4",
                },
                new NameValuePairArgs{
                    Name = "FUNCTIONS_WORKER_RUNTIME",
                    Value = "dotnet",
                },
                new NameValuePairArgs{
                    Name = "APPLICATIONINSIGHTS_CONNECTION_STRING",
                    Value = Output.Format($"InstrumentationKey={appInsights.InstrumentationKey}"),
                },
            },
        },
    });
    
    // var staticSiteCustomDomain = new StaticSiteCustomDomain(prodResourcesName, new()
    // {
    //     DomainName = "radekmaziarka.pl",
    //     Name = staticSite.Name,
    //     ResourceGroupName = resourceGroup.Name,
    //     ValidationMethod = "dns-txt-token",
    // });
    
    // var aRecordSet = new RecordSet(prodResourcesName+"-A", new()
    // {
    //     RecordType = "A",
    //     RelativeRecordSetName = "",
    //     ResourceGroupName = resourceGroup.Name,
    //     TargetResource = new Pulumi.AzureNative.Network.Inputs.SubResourceArgs
    //     {
    //         Id = staticSite.Id,
    //     },
    //     Ttl = 3600,
    //     ZoneName = "radekmaziarka.pl",
    // });
    //
    // var txtRecordSet = new RecordSet(prodResourcesName+"-TXT", new()
    // {
    //     RecordType = "TXT",
    //     RelativeRecordSetName = "",
    //     ResourceGroupName = resourceGroup.Name,
    //     TargetResource = new SubResourceArgs
    //     {
    //         Id = staticSite.Id,
    //     },
    //     TxtRecords = new[]
    //     {
    //         new TxtRecordArgs
    //         {
    //             Value = new[]
    //             {
    //                 staticSiteCustomDomain.ValidationToken
    //             },
    //         },
    //     },
    //     Ttl = 3600,
    //     ZoneName = "radekmaziarka.pl",
    // });
}

return await Pulumi.Deployment.RunAsync(() =>
{
    var resourceGroupName = "radekmaziarkapl";
    var location = "West Europe";
    
    CreateCommonResources(resourceGroupName, location);

    CreateProdResources(resourceGroupName, location);
});

static Output<string> GetConnectionString(Input<string> resourceGroupName, Input<string> accountName)
{
    // Retrieve the primary storage account key.
    var storageAccountKeys = ListStorageAccountKeys.Invoke(new ListStorageAccountKeysInvokeArgs
    {
        ResourceGroupName = resourceGroupName,
        AccountName = accountName
    });
    
    
    return storageAccountKeys.Apply(keys =>
    {
        var primaryStorageKey = keys.Keys[0].Value;

        // Build the connection string to the storage account.
        return Output.Format($"DefaultEndpointsProtocol=https;AccountName={accountName};AccountKey={primaryStorageKey}");
    });
}