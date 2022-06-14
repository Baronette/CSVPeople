using System;
using System.Collections.Generic;
using System.Linq;

namespace CSVParsing.Data
{
    public class Repository
    {
        private readonly string _connection;

        public Repository(string connection)
        {
            _connection = connection;
        }
        public void Add(List<Person> people)
        {
            using var context = new PeopleContext(_connection);
            context.People.AddRange(people);
            context.SaveChanges();
            context.People.ToList();
        }
        public void DeleteAll()
        {
            using var context = new PeopleContext(_connection);
            context.People.RemoveRange(context.People);
            context.SaveChanges();
        }
        public List<Person> GetPeople()
        {
            using var context = new PeopleContext(_connection);
            return context.People.ToList();
        }

    }

}
