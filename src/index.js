import customData1 from './cache/Hildred Sharisa.CombinedCharacter.json';
import customData2 from './cache/Kel Desh.CombinedCharacter.json';
import invTypes from './cache/usedtypes.json';
import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'react-moment';
import './index.css';

class TypeComponent extends React.Component {
	render() {
		var typeID = this.props.typeId;
		var width = 32;
		var invType = this.props.invTypes.find(item => item.typeID === typeID);	
		if (invType) {
			return (
				<span>
					<img width="16px" src={`https://image.eveonline.com/Type/${typeID}_${width}.png`} alt={typeID} title={`${invType.typeID} - ${invType.typeName} - $ ${invType.basePrice}`}/> 
				</span>
			);
		} else {
			return (
					<span>
						<img width="16px" src={`https://image.eveonline.com/Type/${typeID}_${width}.png`} alt={typeID} title={`UNKNOWN typeid ${typeID}`}/> 
					</span>
			);
		}
	}
}

class PlanetExtractorTableData extends React.Component {
	render() {
		return (
			<td><TypeComponent typeId={this.props.pin.extractor_details.product_type_id} invTypes={this.props.invTypes} />finished <Moment title={`Expiry time: ${this.props.pin.expiry_time}`} interval={0} fromNow>{this.props.pin.expiry_time}</Moment></td>
		);
	}
}

class PlanetRow extends React.Component {
	render() {
		return (
				<tr>
				<td>{this.props.planet.PlanetInfo.planet_type}</td>
				{this.props.planet.PlanetLayout.pins.filter(m => m.extractor_details != null).map((pin, key) => {
					return <PlanetExtractorTableData key={key} pin={pin} invTypes={this.props.invTypes}/>
				})}
				</tr>
		);
	}
}

class IndustryJobRow extends React.Component {
	  render() {
		  return (
			  <tr>
				  <td>{this.props.industryJob.activity_id} <TypeComponent typeId={this.props.industryJob.product_type_id} invTypes={this.props.invTypes} />finished <Moment title={`End date: ${this.props.industryJob.end_date}`} interval={0} fromNow>{this.props.industryJob.end_date}</Moment></td>
			  </tr>
		  );
	  }
}

class Character extends React.Component {
  render() {
	  var charName = this.props.character.CharacterInfo.CharacterName;
	  return (
			  <div>
			  	<img src={this.props.character.CharactersPortrait.px64x64} alt={charName} title={charName}/>
			  	<table cellSpacing="10">
			  		<tbody>
					  	{this.props.character.Planets.map((planet, key) => {
					  		return <PlanetRow key={key} planet={planet} invTypes={this.props.invTypes}/>
					  	})}
					  	{this.props.character.IndustryJobs.map((industryJob, key) => {
					  		return <IndustryJobRow key={key} industryJob={industryJob} invTypes={this.props.invTypes}/>
					  	})}
				  	</tbody>
			  	</table>
			  </div>
	  );
  	}
}

class Board extends React.Component {
  render() {
    return (
      <div>
      	{this.props.data.map((character, key) => {
      		return <Character key={key} character={character} invTypes={this.props.invTypes}/>
      	})}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board data={this.props.data} invTypes={this.props.invTypes}/>
        </div>
          {/*
          <ol>
	        {this.props.invTypes.filter(invType => invType.typeID === 2073).map((invType, key) => {
	        	return <li key={key}>{invType.typeName} {invType.typeID}</li>
	        })}
          </ol>
          */}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game data={[customData1,customData2]} invTypes={invTypes}/>,
  document.getElementById('root')
);
