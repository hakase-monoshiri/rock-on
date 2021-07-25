class Send < ApplicationRecord
    belongs_to :climb

    validates :climber, presence: true
    validates :date, presence: true
    validates :climb_id, presence: true
    
end
