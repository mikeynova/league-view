import React from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

const Header = () => (
  <Toolbar>
    <ToolbarGroup>
      <ToolbarTitle text="Options"/>
      <DropDownMenu value="something">
        <MenuItem value='potato' primaryText='hotdog'/>
      </DropDownMenu>
    </ToolbarGroup>
  </Toolbar>
)

export default Header
