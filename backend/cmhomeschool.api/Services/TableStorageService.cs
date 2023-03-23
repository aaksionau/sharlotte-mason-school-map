using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.Extensions.Configuration;
using SharlotteMason.Entities;

namespace SharlotteMason.Services;

public class TableStorageService : ITableStorageService
{
    private const string TableName = "HomeSchool";
    private readonly IConfiguration _configuration;
    public TableStorageService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<HomeSchool> RetrieveAsync(string id, string category)
    {
        var retrieveOperation = TableOperation.Retrieve<HomeSchool>(id, category);
        return await ExecuteTableOperation(retrieveOperation) as HomeSchool;
    }
    public async Task<HomeSchool> InsertOrMergeAsync(HomeSchool entity)
    {
        var insertOrMergeOperation = TableOperation.InsertOrReplace(entity);
        return await ExecuteTableOperation(insertOrMergeOperation) as HomeSchool;
    }
    public async Task<HomeSchool> DeleteAsync(HomeSchool entity)
    {
        var deleteOperation = TableOperation.Delete(entity);
        return await ExecuteTableOperation(deleteOperation) as HomeSchool;
    }

    public async Task<List<HomeSchool>> GetListAsync()
    {
        TableQuery<HomeSchool> query = new TableQuery<HomeSchool>();
        var table = await GetCloudTable();
        var result = (table.ExecuteQuery(query)).ToList() as List<HomeSchool>;
        return result;
    }
    private async Task<object> ExecuteTableOperation(TableOperation tableOperation)
    {
        var table = await GetCloudTable();
        var tableResult = await table.ExecuteAsync(tableOperation);
        return tableResult.Result;
    }
    private async Task<CloudTable> GetCloudTable()
    {
        var storageAccount = CloudStorageAccount.Parse(_configuration["StorageConnectionString"]);
        var tableClient = storageAccount.CreateCloudTableClient(new TableClientConfiguration());
        var table = tableClient.GetTableReference(TableName);
        await table.CreateIfNotExistsAsync();
        return table;
    }
}