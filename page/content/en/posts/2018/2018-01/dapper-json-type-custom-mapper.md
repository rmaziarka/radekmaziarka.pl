---
title: 'Dapper - JSON type custom mapper'
url: '/2018/01/22/dapper-json-type-custom-mapper/'
date: Mon, 22 Jan 2018 17:27:46 +0000
draft: false
featured_image: 'images/2018/01/00_Dapper.jpg'
category: 'ORM'
tags: ['Dapper', 'JSON', 'MS SQL', 'ORM']
---

Let's assume that we have such read model:
```
public class ProductReadModel 
{
	public int Id { get; private set; }
	
	public string Name { get; private set; }
	
	public int CategoryId { get; private set; }
	
	public Category Category { get; private set; }
	
	public Dictionary<int, object> FieldValues { get; private set; }
}
```
And we want store **Category** and **FieldValues** in the table, as JSON string.  How to handle JSON serialization and deserialization in Dapper?

## TypeHandlers

TypeHandlers are an option in Dapper to serialize / deserialize objects during saving and querying the database. First, we define an implementation of **ITypeHandler** interface:
```
public class JsonObjectTypeHandler : SqlMapper.ITypeHandler
{
	public void SetValue(IDbDataParameter parameter, object value)
	{
		parameter.Value = (value == null)
			? (object)DBNull.Value
			: JsonConvert.SerializeObject(value);
		parameter.DbType = DbType.String;
	}

	public object Parse(Type destinationType, object value)
	{
		return JsonConvert.DeserializeObject(value.ToString(), destinationType);
	}
}
```
**SetValue** method returns serialized object to JSON string, handling also the null value. **Parse** method returns deserialized object from the database column.

Then we register our type handlers during app startup:
```
	SqlMapper.AddTypeHandler(typeof(Dictionary<int, object>), new JsonObjectTypeHandler ());
	SqlMapper.AddTypeHandler(typeof(Category), new JsonObjectTypeHandler ());
```
In that way, we achieve seamless objects serialization and deserialization without changing our code.

## Private fields

I like to keep my class setters private to force usage of strictly defined changing methods.

But on another hand, we want to gather full object from the database. To achieve it we inherit from **DefaultContractResolver **and allow setting also private fields:
```
public class NonPublicPropertiesResolver : DefaultContractResolver
{
	protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
	{
		var prop = base.CreateProperty(member, memberSerialization);
		var pi = member as PropertyInfo;
		if (pi != null)
		{
			prop.Readable = (pi.GetMethod != null);
			prop.Writable = (pi.SetMethod != null);
		}
		return prop;
	}
}
```
Then we register resolver during app startup:
```
	JsonConvert.DefaultSettings = () => new JsonSerializerSettings
	{
		ContractResolver = new NonPublicPropertiesResolver()
	};
```

---
### Comments:
#### 
[dotnetomaniak.pl](https://dotnetomaniak.pl/Dapper-JSON-type-custom-mapper-Radek-Maziarka-Blog "") - <time datetime="2018-01-22 23:01:29">Jan 1, 2018</time>

**Dapper – JSON type custom mapper | Radek Maziarka Blog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
