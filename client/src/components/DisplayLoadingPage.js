export default function DisplayLoadingPage(props) {
  console.log("the player: ", props.player);
  return (
    <div className="loading-page">
      <section class="wrapper">
  <div class="top">Be ready for the battle!</div>
  <div class="bottom" aria-hidden="true">Be ready for the battle!</div>
</section>
      {props.page("battle")}
      <div className="card-holder">
        <div className="player-card">
          <figure className="card">
            <div className="card__image-container">
              <img
                src={props.player.sprites.other.showdown.front_default}
                alt={props.player.name}
                className="card__image"
              />
            </div>
            <figcaption clasNames="card__caption">
              <h1 className="card__name">{props.player.name}</h1>
              <h3 className="card__type">Pokemon</h3>
              <table className="card__stats">
                <tbody>
                  <tr>
                    <th>HP</th>
                    <td>{props.player.stats[0].base_stat}</td>
                  </tr>
                  <tr>
                    <th>Attack</th>
                    <td>{props.player.stats[0].base_stat}</td>
                  </tr>
                  <tr>
                    <th>Defense</th>
                    <td>{props.player.stats[0].base_stat}</td>
                  </tr>
                  <tr>
                    <th>Special Attack</th>
                    <td>{props.player.stats[3].base_stat}</td>
                  </tr>
                  <tr>
                    <th>Special Defense</th>
                    <td>{props.player.stats[4].base_stat}</td>
                  </tr>
                  <tr>
                    <th>Speed</th>
                    <td>{props.player.stats[5].base_stat}</td>
                  </tr>
                </tbody>
              </table>
            </figcaption>
          </figure>
        </div>
        <div className="enemy-card">
          <figure className="card">
            <div className="card__image-container">
              <img
                src={props.enemy.sprites.other.showdown.front_default}
                alt={props.enemy.name}
                className="card__image"
              />
            </div>
            <figcaption clasNames="card__caption">
              <h1 className="card__name">{props.enemy.name}</h1>
              <h3 className="card__type">Pokemon</h3>
              <table className="card__stats">
                <tbody>
                  <tr>
                    <th>HP</th>
                    <td>{props.enemy.stats[0].base_stat}</td>
                  </tr>
                  <tr>
                    <th>Attack</th>
                    <td>{props.enemy.stats[0].base_stat}</td>
                  </tr>
                  <tr>
                    <th>Defense</th>
                    <td>{props.enemy.stats[0].base_stat}</td>
                  </tr>
                  <tr>
                    <th>Special Attack</th>
                    <td>{props.enemy.stats[3].base_stat}</td>
                  </tr>
                  <tr>
                    <th>Special Defense</th>
                    <td>{props.enemy.stats[4].base_stat}</td>
                  </tr>
                  <tr>
                    <th>Speed</th>
                    <td>{props.enemy.stats[5].base_stat}</td>
                  </tr>
                </tbody>
              </table>
            </figcaption>
          </figure>
        </div>
      </div>

      <span className="loader__element"></span>
      <span className="loader__element"></span>
      <span className="loader__element"></span>
    </div>
  );
}
