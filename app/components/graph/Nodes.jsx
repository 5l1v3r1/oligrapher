import React from 'react'
import PropTypes from 'prop-types'

import values from 'lodash/values'
import noop from 'lodash/noop'

import { Node as LegacyNode } from '../../../legacy-app/components/Node'


function legacyNode(node, graph, zoom) {
  return <LegacyNode ref={noop}
                     key={node.id}
                     node={node}
                     graph={graph}
                     zoom={zoom}
                     selected={null}
                     clickNode={noop}
                     moveNode={noop}
                     isLocked={false} />
}

export default function Nodes({graph, zoom }) {
  return <g className="nodes">
           { values(graph.nodes).map(node => legacyNode(node, graph, zoom)) }
         </g>
}

Nodes.propTypes = {
  graph: PropTypes.object.isRequired,
  zoom: PropTypes.number.isRequired
}
