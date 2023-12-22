import { Component, ElementRef, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { RangeCustomEvent } from '@ionic/angular';

// Swiper-Elemente registrieren
register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('swiper') swiperRef: ElementRef | undefined;

  // Fortschritt und Slider-Wert initialisieren
  public progress = 0.2;
  public sliderValue = 0

  // Array zum Speichern der Bewertungen und der Rangliste initialisieren
  public scores: (number | Object)[] = [];
  public ranking: Record<string, any>[] = [];

  //Event-Handler für die Veränderung des Ion-Range-Sliders
  onIonChange(ev: Event) {
    const value = (ev as RangeCustomEvent).detail.value;
    // Fortschritt erhöhen(5 slides => 1/5)
    this.progress += 0.2;
    // Bewertung zum Array hinzufügen
    this.scores.push(value.valueOf())
    // Zum nächsten Slide wechseln, wenn verfügbar
    this.swiperRef?.nativeElement.swiper.slideNext()
    // Wenn das Ende erreicht ist, die Rangliste erstellen
    if (this.swiperRef?.nativeElement.swiper.isEnd) {
      let result = this.scores.filter(item => typeof item === 'number');
      this.ranking = [
        { "dish": "pizza", "score": result[0] },
        { "dish": "kebap", "score": result[1] },
        { "dish": "spaghetti", "score": result[2] },
        { "dish": "salad", "score": result[3] }
      ]
      // absteigende Sortierung
      this.ranking = this.ranking.sort((a, b) => (b["score"] as number) - (a["score"] as number));
      
    }
    this.sliderValue = 0; // Slider-Wert zurückgesetzt (kann man weglassen, wenn man den Wert davor beibehalten möchte)
  }

  constructor() {
  }
}
