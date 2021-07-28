class AddNicknameToClimbs < ActiveRecord::Migration[6.1]
  def change
    add_column :climbs, :nickname, :string
  end
end
