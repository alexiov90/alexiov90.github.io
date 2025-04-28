import { Component, OnInit } from '@angular/core';
import { FantasmiService } from './fantasmi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = "Phasmo app";
  isAccordionOpen = false;
  isLeftMenuOpen: boolean = false;
  isRightMenuOpen: boolean = false;
  schoolRoomImages: string[] = [];
  selectedImage: string | null = null;
  selectedImageIndex: number | null = null;
  prove: string[] = ["Libro Spiritico", "EMF", "DOTS", "Spirit Box", "UV", "Temperatura di Congelamento", "Sfere di Luce"];
  proveSelezionate: { [key: string]: boolean } = {};
  proveEscluse: { [key: string]: boolean } = {};
  fantasmi: any[] = [];
  fantasmiFiltrati: any[] = [];
  weeklyChallenge = {
    "id": 18,
    "challenge": "No Evidence",
    "description": "These ghosts really don't wanna help you out, but we're sure you're up to the task.",
    "details": {
        "num_evidence": 0,
        "player_speed": 100,
        "ghost_speed": 100,
        "cursed_objects": [
            "Haunted Mirror"
        ],
        "friendly_ghost": "Off",
        "cssettings": {
            "hunt_duration": "High",
            "starting_sanity": 100,
            "sanity_pill_restoration": 25,
            "sanity_drain_speed": 200
        }
    },
    "map": "Grafton Farmhouse",
    "equipment_url": "https://i.imgur.com/XYNFc46.png",
    "map_id": "grafton",
    "difficulty_id": "0982-7606-0836"
  };
  maps =
    [
      { name: '6 Tanglewood Drive', image: 'tanglewood.jpg' },
      { name: '10 Ridgeview Court', image: 'ridgeview.jpg' },
      { name: '13 Willow Street', image: 'willow.jpg' },
      { name: '42 Edgefield Road', image: 'edgefield.jpg' },
      { name: 'Camp Woodwind', image: 'campwoodwind.jpg' },
      { name: 'Grafton Farmhouse', image: 'grafton.jpg' },
      { name: 'Bleasdale Farmhouse', image: 'bleasdale.jpg' },
      { name: 'Maple Lodge Campsite', image: 'maplelodge.jpg' },
      { name: 'Point Hope', image: 'pointhope.jpg' },
      { name: 'Prison', image: 'prison.jpg' },
      { name: 'Sunny Meadows Restricted', image: 'sunnyrestricted.jpg' },
      { name: 'Brownstone High School', image: 'brownstone.jpg' },
      { name: 'Sunny Meadows', image: 'sunnymeadows.jpg' }
    ];

  selectedMap = this.maps.find(e=>e.name == this.weeklyChallenge.map);

  constructor(private fantasmiService: FantasmiService) {}

  ngOnInit(): void {
    this.fantasmiService.getFantasmi().subscribe(data => {
      this.fantasmi = data;
      this.fantasmiFiltrati = data;
    });

    // Inizializza gli oggetti delle checkbox
    this.prove.forEach(prova => {
      this.proveSelezionate[prova] = false;
      this.proveEscluse[prova] = false;
    });
    for (let i = 1; i <= 37; i++) {
      if (i < 10)
        this.schoolRoomImages.push(`Classroom_0${i}.png`);
      else
        this.schoolRoomImages.push(`Classroom_${i}.png`);
    }
  }

  filtraFantasmi(): void {
    this.fantasmiFiltrati = this.fantasmi.filter(fantasma => {
      const haTutteLeSelezionate = Object.keys(this.proveSelezionate)
        .filter(prova => this.proveSelezionate[prova])
        .every(prova => fantasma.prove.includes(prova));

      const nonHaEscluse = Object.keys(this.proveEscluse)
        .filter(prova => this.proveEscluse[prova])
        .every(prova => !fantasma.prove.includes(prova));

      return haTutteLeSelezionate && nonHaEscluse;
    });
  }

  reset(){
    this.proveSelezionate = {};
    this.proveEscluse = {};
    this.isLeftMenuOpen = false;
    this.isRightMenuOpen = false;
    this.filtraFantasmi();
  }

  toggleAccordion() {
    this.isAccordionOpen = !this.isAccordionOpen;
    const content = document.querySelector('.accordion-content');
    if (content) {
      content.classList.toggle('is-active', this.isAccordionOpen);
    }
  }

  openImage(img: string) {
    this.selectedImageIndex = this.schoolRoomImages.indexOf(img);
  }

  closeImage() {
    this.selectedImageIndex = null;
  }

  prevImage(event: Event) {
    event.stopPropagation();
    if (this.selectedImageIndex !== null && this.selectedImageIndex > 0) {
      this.selectedImageIndex--;
    }
  }

  nextImage(event: Event) {
    event.stopPropagation();
    if (
      this.selectedImageIndex !== null &&
      this.selectedImageIndex < this.schoolRoomImages.length - 1
    ) {
      this.selectedImageIndex++;

    }
  }

  selectMap(map: any) {
    this.selectedMap = map;
  }

  toggleLeftMenu(): void {
    this.isLeftMenuOpen = !this.isLeftMenuOpen;
  }

  toggleRightMenu(): void {
    this.isRightMenuOpen = !this.isRightMenuOpen;
  }
}
