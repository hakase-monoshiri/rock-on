class AddColorToClimbs < ActiveRecord::Migration[6.1]
  def change
    add_column :climbs, :color, :string
  end
end
