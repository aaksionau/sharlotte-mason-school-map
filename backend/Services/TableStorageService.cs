using System.Threading.Tasks;
using SharlotteMason.Entities;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.Extensions.Configuration;

namespace SharlotteMason.Services;

public class TableStorageService : ITableStorageService { 
        private const string TableName = "HomeSchool";
        private readonly IConfiguration _configuration;
        public TableStorageService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
                
        public async Task<HomeSchool> RetrieveAsync(string category, string id)
        {
            var retrieveOperation = TableOperation.Retrieve<HomeSchool>(category, id);
            return await ExecuteTableOperation(retrieveOperation) as HomeSchool;
        }
        public async Task<HomeSchool> InsertOrMergeAsync(HomeSchool entity)
        {
            var insertOrMergeOperation = TableOperation.InsertOrMerge(entity);
            return await ExecuteTableOperation(insertOrMergeOperation) as HomeSchool;
        }
        public async Task<HomeSchool> DeleteAsync(HomeSchool entity)
        {
            var deleteOperation = TableOperation.Delete(entity);
            return await ExecuteTableOperation(deleteOperation) as HomeSchool;
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