var React = require("react");
var PropTypes = React.PropTypes;
var BackgroundRect = require("./BackgroundRect.jsx");
var SvgText = require("./SvgText.jsx");
var ChartFooter = require("./ChartFooter.jsx");

var SvgWrapper = React.createClass({

	propTypes: {
		outerDimensions: PropTypes.object,
		metadata: PropTypes.object,
		margin: PropTypes.object,
		displayConfig: PropTypes.object
	},

	_createTitle: function(props) {
		return (
			<SvgText
				text={props.metadata.title}
				key="title"
				translate={[
					props.displayConfig.margin.left,
					props.displayConfig.margin.top
				]}
				align="top"
				className="svg-text-title"
			/>
		);
	},

	_createSubtitle: function(props) {
		var titleHeight = (props.metadata.title.length > 0) ? props.displayConfig.afterTitle : 0;

		return (
			<SvgText
				text={props.metadata.subtitle}
				key="subtitle"
				translate={[
					props.displayConfig.margin.left,
					(props.displayConfig.margin.top + titleHeight)
				]}
				align="top"
				className="svg-text-subtitle"
			/>
		);
	},

	_getYOffset: function(props) {
		var yOffset = 0
		if (props.metadata.title.length > 0) { yOffset += props.displayConfig.afterTitle; }
		if (props.metadata.subtitle.length > 0) { yOffset += props.displayConfig.afterSubtitle; }
		return yOffset;
	},

	render: function() {
		var props = this.props;
		var margin = props.displayConfig.margin;
		var yOffset = this._getYOffset(props);
		// Add to the chart margin if title is present
		var outerDimensions = {
			width: props.outerDimensions.width,
			height: props.outerDimensions.height + yOffset
		};

		var translate = {
			top: margin.top,
			right: outerDimensions.width - margin.right,
			bottom: outerDimensions.height - margin.bottom,
			left: margin.left
		};

		return (
			<svg className="chartbuilder-svg" width={outerDimensions.width} height={outerDimensions.height}>
				<BackgroundRect dimensions={outerDimensions} />
				{this._createTitle(props)}
				{this._createSubtitle(props)}
				<g
					className="chart-margin"
					transform={"translate(" + [translate.left, translate.top + this._getYOffset(props)] + ")"} >
					{props.children}
				</g>
				<ChartFooter
					metadata={props.metadata}
					key="chartFooter"
					translate={translate}
					className="svg-credit-data"
				/>
			</svg>
		);
	}

});

module.exports = SvgWrapper;
