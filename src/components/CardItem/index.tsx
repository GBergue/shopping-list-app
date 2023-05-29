import React from "react";
import { ListItem } from "@rneui/base";
import { Icon } from '@rneui/themed';

import { THEME } from "../../theme/theme";
import { ItemData } from "../../models/IData";
import { deleteItem } from "../../storage/store";


interface Props {
  item: ItemData;
  handleDelete: (idToRemove: number) => void;
}

export default function CardItem({ item, handleDelete }: Props) {
  if (!item) {
    return null;
  }

  const { addedAt, category, quantity, description, id, place, unity } = item;

  const sub = `${quantity} ${unity} ${addedAt}`;


  return (
    <ListItem
      bottomDivider
      containerStyle={{ backgroundColor: THEME.colors.gray[400] }}
    >
      <ListItem.Content>
        <ListItem.Title style={{ color: THEME.colors.white }}>
          {description}
        </ListItem.Title>
        <ListItem.Subtitle style={{ color: THEME.colors.white }}>
          {sub}
        </ListItem.Subtitle>
      </ListItem.Content>
      <Icon name='trash' type='font-awesome' color={THEME.colors.white}  onPress={() => handleDelete(id)}/>
    </ListItem>
  );
}
