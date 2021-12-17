# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

todd = User.create(name:"Todd", email:"toddsrealemail@123.com", password:"password", password_confirmation: "password",
city: "Detroit", activity:"climbing", gender: "male", age: 29, 
profile_pic:'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg', 
bio: "this is a bio!")

josh = User.create(name:"Josh", email:"joshsrealemail@123.com", password:"password", password_confirmation: "password",
city: "Kalamazoo", activity:"Hiking", gender: "male", age: 28, 
profile_pic:'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg', 
bio: "this is a bio!")

sarah = User.create(name:"Sarah", email:"sarahsrealemail@123.com", password:"password", password_confirmation: "password",
city: "Holland", activity:"Trail Running", gender: "female", age: 28, 
profile_pic:'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg', 
bio: "this is a bio!")

beau = User.create(name:"Beau", email:"beausrealemail@123.com", password:"password", password_confirmation: "password",
city: "Northville", activity:"climbing", gender: "non-binary", age: 24, 
profile_pic:'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg', 
bio: "this is a bio!")

gap = Trip.create(title:"The GAP in 3 days!", description: "A bikepacking trip on the Great Allegheny Passage rail trial.
about 330 miles form Pittsburgh to Washington DC.  Self supported so make sure you can pack all neccessary gear on your bike!",
start: "05/12/2022", end: "05/15/2022", longitude: 40.4418, latitude: -80.0131, minimum_participants: 2, max_participants: 6, 
host_user: todd.id, requirements: "must have your own bike, luggage, and gear.  Must be able to ride 100 miles per day for three days.")

part1 = Participant.create(user_id: todd.id, trip_id: gap.id)
part2 = Participant.create(user_id: beau.id, trip_id: gap.id)
part3 = Participant.create(user_id: josh.id, trip_id: gap.id)

10.times do
    content = Faker::ChuckNorris.fact
    trip_id = gap.id
    sender_id = rand(1..4)
    Message.create(content: content, trip_id: trip_id, sender_id: sender_id)
end