
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {user_id: 1, user_name: 'admin', password: "admin", full_name:"Administrador", email:"administrator@actuaproducciones.com",role:"Administrator"}
      ]);
    });
};
