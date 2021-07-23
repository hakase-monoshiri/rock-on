class CreateClimbs < ActiveRecord::Migration[6.1]
  def change
    create_table :climbs do |t|
      t.string :type
      t.string :grade
      t.string :location
      t.text :notes

      t.timestamps
    end
  end
end
