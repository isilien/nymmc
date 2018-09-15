import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';

export default class SimpleSortableList extends Component {
  render() {
    return (
      <div>
        <Container 
            getChildPayload={this.props.getChildPayload} 
            onDrop={this.props.onDrop}
            groupName={this.props.groupName}
            orientation="horizontal"
        >
          {this.props.items.map(item => {
            return (
              <Draggable key={item.id || undefined}>
                {this.props.renderItem(item)}
              </Draggable>
            );
          })}
        </Container>
      </div>
    );
  }
}