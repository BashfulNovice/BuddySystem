class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content

  belongs_to :sender
end
