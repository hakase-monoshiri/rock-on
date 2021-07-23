class CreateSends < ActiveRecord::Migration[6.1]
  def change
    create_table :sends do |t|
      t.string :climber
      t.datetime :date
      t.text :notes
      t.integer :climb_id

      t.timestamps
    end
  end
end
