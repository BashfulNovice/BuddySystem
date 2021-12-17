class Trip < ApplicationRecord

    belongs_to :host, class_name: "User", foreign_key: "host_user"
    has_many :participants
    has_many :users, through: :participants
    has_many :messages
end
