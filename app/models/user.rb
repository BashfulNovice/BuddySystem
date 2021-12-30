class User < ApplicationRecord
    has_secure_password

    #associations
    has_many :hosted_trips, class_name: "Trip", foreign_key: "host_user"
    has_many :sent_messages, class_name: "Message", foreign_key: "sender_id"
    has_many :participants
    has_many :trips, through: :participants

    #validations
    validates :name, presence: true
    validates :email, presence: true
    validates :gender, presence: true
    validates :age, presence: true

end
