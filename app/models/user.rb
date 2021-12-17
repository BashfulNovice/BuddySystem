class User < ApplicationRecord
    has_secure_password

    has_many :hosted_trips, class_name: "Trip", foreign_key: "host_user"
    has_many :sent_messages, class_name: "Message", foreign_key: "sender_id"
    has_many :participants
    has_many :trips, through: :participants
end
