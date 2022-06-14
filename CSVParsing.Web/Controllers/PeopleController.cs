using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsvHelper;
using Faker;
using Microsoft.Extensions.Configuration;
using CSVParsing.Data;
using System.Text;
using System.IO;
using System.Globalization;

namespace CSVParsing.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connection;
        public PeopleController(IConfiguration configuration)
        {
            _connection = configuration.GetConnectionString("ConStr");
        }
        [HttpGet]
        [Route("generate/{count}")]
        public IActionResult Generate(int count)
        {
            var people = GeneratePeople(count);
            var csv = GetCsv(people);
            byte[] bytes = Encoding.UTF8.GetBytes(csv);
            return File(bytes, "text/csv", "people.csv");
        }
        [HttpPost]
        [Route("upload")]
        public void Upload(FileViewModel file)
        {
            int index = file.Base64.IndexOf(",") + 1;
            string base64 = file.Base64.Substring(index);
            byte[] bytes = Convert.FromBase64String(base64);
            var people = GetfromCsvBytes(bytes);
            var repo = new Repository(_connection);
            repo.Add(people);
        }
        [HttpGet]
        [Route("getpeople")]
        public List<Person> GetPeople()
        {
            var repo = new Repository(_connection);
            return repo.GetPeople();
        }
        [HttpPost]
        [Route("deleteall")]
        public void DeleteAll()
        {
            var repo = new Repository(_connection);
            repo.DeleteAll();
        }

        static List<Person> GeneratePeople(int count)
        {
            return Enumerable.Range(1, count).Select(_ =>
            {
                return new Person
                {
                    FirstName = Name.First(),
                    LastName = Name.Last(),
                    Age = RandomNumber.Next(12, 100),
                    Address = Address.StreetAddress(),
                    Email = Internet.Email()
                };
            }).ToList();
        }
        static string GetCsv(List<Person> people)
        {
            var builder = new StringBuilder();
            var stringWriter = new StringWriter(builder);
            using var csv = new CsvWriter(stringWriter, CultureInfo.InvariantCulture);
            csv.WriteRecords(people);
            return builder.ToString();
        }

        static List<Person> GetfromCsvBytes(byte[] csvBytes)
        {
            using var memoryStream = new MemoryStream(csvBytes);
            var streamReader = new StreamReader(memoryStream);
            using var reader = new CsvReader(streamReader, CultureInfo.InvariantCulture);
            return reader.GetRecords<Person>().ToList();
        }
    }


}
