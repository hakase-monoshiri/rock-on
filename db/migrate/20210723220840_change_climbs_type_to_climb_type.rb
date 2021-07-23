class ChangeClimbsTypeToClimbType < ActiveRecord::Migration[6.1]
  def change
    rename_column :climbs, :type, :climb_type
  end
end
