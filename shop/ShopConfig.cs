using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace shop;

public record ShopConfig(List<Product> Products, string TaxId);
public record Product(string PriceId, string Code, string Name, string Link);

public static class ShopConfigProvider {

    public static ShopConfig Get()
    {
        var json = System.Environment.GetEnvironmentVariable("Products", EnvironmentVariableTarget.Process);
        var config = JsonConvert.DeserializeObject<ShopConfig>(json);
        return config;
    }
}