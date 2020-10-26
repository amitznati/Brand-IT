import React from 'react';
import LayoutListOpen from './layoutListOpen';
import LayoutsListClose from './LayoutsListClose';

function LayoutListMainView(props) {
  const {
    isSVGPathBuilderOpen,
    selectedLayout,
    layouts,
    onBack,
    onUpdateLayout,
    onTogglePathBuilder,
    onDeleteLayout,
    onLayoutClick,
    onSortEnd,
    setIgnoreLayout,
    onDuplicateLayout
  } = props;
  return (
    <div>
      {!selectedLayout && (
        <LayoutsListClose
          onSortEnd={onSortEnd}
          layouts={layouts}
          onLayoutClick={onLayoutClick}
          onDeleteLayout={onDeleteLayout}
          setIgnoreLayout={setIgnoreLayout}
          onDuplicateLayout={onDuplicateLayout}
        />
      )}
      {selectedLayout && (
        <LayoutListOpen
          layout={selectedLayout}
          onBack={onBack}
          onUpdate={onUpdateLayout}
          onTogglePathBuilder={onTogglePathBuilder}
          {...{ isSVGPathBuilderOpen }}
        />
      )}
    </div>
  );
}

export default LayoutListMainView;
