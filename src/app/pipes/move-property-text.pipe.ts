import { Pipe, PipeTransform } from '@angular/core';
import { MoveProperty } from '../types';

@Pipe({
  name: 'movePropertyText',
})
export class MovePropertyTextPipe implements PipeTransform {
  transform(property: MoveProperty): string {
    switch (property) {
      case 'SCREW':
        return '<strong>Screw Attack</strong><br>Causes an airborne opponent to spin in the air and land on their backs with their legs pointing up.';
      case 'WALL BOUNCE':
        return '<strong>Wall Bound</strong><br>Enemy is launched towards the wall and bounces back from it allowing for a short juggle.';
      case 'POWER CRUSH':
        return '<strong>Power Crush</strong><br>Let fighter absorb damage from mid or high attacks while allowing their own attack to continue.';
      case 'HOMING':
        return '<strong>Homing Attack</strong><br>Move that can track and hit an opponent while they are sidestepping.';
      case 'HIGH CRUSH':
        return '<strong>High Crush</strong><br>Avoids high attacks by putting fighter in technically crouching state.';
      case 'LOW CRUSH':
        return '<strong>Low Crush</strong><br>Avoids low attacks by putting fighter in technically jumping state.';
      case 'WALL BREAK':
        return '<strong>Wall Break</strong><br>Indicating that this move will break a breakable wall.';
      case 'WALL SPLAT':
        return '<strong>Wall Splat</strong><br>Indicating that this move will splat enemy on the wall.';
      case 'FLOOR BREAK':
        return '<strong>Floor Break</strong><br>Indicating that this move will break a breakable floor.';
      case 'THROW 1':
        return '<strong>Throw (break with: 1)</strong><br>A throw is a type of grabbing move. Throws must be performed within close range of the opponent and cannot be blocked.';
      case 'THROW 1+2':
        return '<strong>Throw (break with: 1+2)</strong><br>A throw is a type of grabbing move. Throws must be performed within close range of the opponent and cannot be blocked.';
      case 'THROW 2':
        return '<strong>Throw (break with: 2)</strong><br>A throw is a type of grabbing move. Throws must be performed within close range of the opponent and cannot be blocked.';
      case 'HEAT ENGAGER':
        return '<strong>Heat engager</strong><br>Attack that puts fighter in heat state, rushing towards the opponent and gaining significant advantage.';
      case 'TORNADO':
        return '<strong>Tornado</strong><br>When struck, the opponent is flipped in the air before landing in a bound-like state, open to further follow-ups.';
      case 'CHIP':
        return '<strong>Chip damage</strong><br>This attack will deal a recoverable damage on block. The damage can be recovered by dealing damage.';
      case 'WALL CRUSH':
        return '<strong>Wall crush</strong><br>Deals a hitstun with large pushback which can bounce the opponent off the wall for a bigger hitstun. Defender is in guardable recovery and recovers in full crouch.';
      default:
        return 'Unknown move property';
    }
  }
}
