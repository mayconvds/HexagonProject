import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/user/user";
import {UserResponse} from "../../../../models/user/user-response";
import {Helpers} from "../../../../shared/helpers";
import {UserModel} from "../../../../models/user/user-model";
import {AjaxLoadService} from "../../../../services/ajax-load.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit{
    user: User = new User();
    response: UserResponse = new UserResponse();
    constructor(private userModel: UserModel, private ajaxLoadService: AjaxLoadService) {
    }

    private names: string[] = ["Liam Smith", "Olivia Johnson", "Noah Williams", "Emma Brown", "Oliver Jones", "Ava Davis", "Elijah Miller", "Isabella Wilson", "William Moore", "Sophia Taylor", "James Anderson", "Mia Thomas", "Benjamin Jackson", "Amelia White", "Lucas Harris", "Harper Martin", "Henry Thompson", "Evelyn Garcia", "Alexander Martinez", "Abigail Robinson", "Michael Clark", "Emily Rodriguez", "Ethan Lewis", "Elizabeth Lee", "Daniel Walker", "Mila Hall", "Matthew Allen", "Ella Young", "Aiden Hernandez", "Avery King", "Joseph Wright", "Sofia Lopez", "David Hill", "Camila Scott", "Carter Green", "Scarlett Adams", "Wyatt Baker", "Grace Gonzalez", "John Nelson", "Chloe Carter", "Owen Mitchell", "Victoria Perez", "Dylan Roberts", "Luna Turner", "Luke Phillips", "Lily Campbell", "Gabriel Parker", "Layla Evans", "Anthony Edwards", "Zoey Collins", "Isaac Stewart", "Riley Sanchez", "Grayson Morris", "Lillian Jenkins", "Jack Murphy", "Nora Rivera", "Julian Cook", "Hannah Cox", "Levi Ross", "Addison Morgan", "Christopher Bell", "Aria Bennett", "Joshua Wood", "Madison Brooks", "Andrew Price", "Ellie Perry", "Lincoln Powell", "Hazel Long", "Mateo Hughes", "Aurora Foster", "Ryan Sanders", "Penelope Ramirez", "Jaxon Simmons", "Natalie Diaz", "Nathan Hayes", "Eleanor Castillo", "Aaron Harper", "Violet Coleman", "Isaiah Richardson", "Stella Reed", "Thomas Washington", "Savannah Ortiz", "Charles Gomez", "Brooklyn Cruz", "Caleb Edwards", "Paisley Ortega", "Josiah Kim", "Audrey Collins", "Christian Carter", "Claire Bennett", "Hunter Hernandez", "Skylar Ward", "Eli Cook", "Isla Johnston", "Jonathan Hughes", "Genesis Murray", "Connor Reed", "Naomi Torres", "Landon Ramirez", "Emilia Barnes", "Adrian Cole", "Elena Coleman", "Asher Griffin", "Sarah Castro", "Cameron Hawkins", "Victoria Perkins", "Leo Matthews", "Lauren Reyes", "Theodore Stevenson", "Liliana Watson", "Jeremiah Gray", "Alexa Howard", "Hudson West", "Serenity Ortiz", "Robert Fisher", "Gabriella Tucker", "Easton Porter", "Sadie Peterson", "Nolan Foster", "Piper Ramirez", "Nicholas Barnes", "Ariana Brooks", "Ezra Coleman", "Kaylee Patterson", "Colton Jensen", "Ruby Cooper", "Angel Dixon", "Everly Cox", "Brayden Cooper", "Annabelle Silva", "Jordan Perry", "Caroline Richardson", "Dominic Price", "Madelyn Patterson", "Austin Powell", "Alice Ramos", "Ian Howell", "Kinsley Peterson", "Adam Porter", "Hailey Johnson", "Elias Jenkins", "Makayla Scott", "Jaxson Rivera", "Aubree Rogers", "Greyson Morgan", "Aria Coleman", "Jose Tucker", "Zoe Bennett", "Ezekiel Cook", "Nevaeh Evans", "Carson Rivera", "Sadie Smith", "Evan Price", "Eva Johnson", "Maverick Perry", "Emery Hill", "Bryson Reed", "Willow Cooper", "Xavier Adams", "Hudson Bell", "Parker Cox", "Natalie Powell", "Roman Gomez", "Skylar Morgan", "Jason Richardson", "Nova Patterson", "Santiago Phillips", "Serenity Smith", "Chase Richardson", "Everleigh Peterson", "Sawyer Rivera", "Leilani Lopez", "Gavin Hill", "Elliana Martinez", "Leonardo Wood", "Athena Thompson", "Kayden Hernandez", "Arianna Carter", "Ayden Bell", "Cora Collins", "Jameson Cook", "Alexandra Davis", "Kevin Parker", "Alaina Ramirez", "Bentley Cooper", "Maci Powell", "Zachary Gomez", "Katherine Bennett", "Everett Hill", "Adeline Campbell", "Axel Hughes", "Alexis Diaz", "Tyler Turner", "Angelina Foster", "Micah Bell", "Vivian Wood", "Vincent Washington", "Skyler Peterson", "Weston Reed", "Allison Porter", "Miles Murray", "Samantha Richardson", "Wesley Carter", "Stella Murphy", "Nathaniel Fisher", "Brielle Howell", "Harrison Howard", "Everlee Diaz", "Brandon Price", "Sage Collins", "Cole Howell", "Josephine Perez", "Declan Evans", "Arya Foster", "Luis Silva", "Madilyn Hayes", "Braxton Peterson", "Melanie Campbell", "Damian Porter", "Gabrielle Edwards", "Silas Ramirez", "Isabelle Nelson", "Tristan Powell", "Adalynn Scott", "Ryder Foster", "Alyssa Jenkins", "Bennett Hughes", "Adalyn Coleman", "George Gomez", "Amaya Carter", "Emmanuel Wood", "Eliza Richardson", "Justin Cook", "Helen Murphy", "Kai Turner", "Maddison Rogers", "Max Howell", "Kinley Rodriguez", "Jayden Fisher", "Remi Thompson", "Bryce Bell", "Charlie Howard", "Seth Baker", "Esther Turner", "Jesse Reed", "Valeria Peterson", "Victor Foster", "Lucia Martinez", "Patrick Porter", "Rose Davis", "Timothy Cox", "Cecilia Gomez", "Finn Howell", "Ana Rodriguez", "Leon Johnston", "Juliana Bell", "Ivan Richardson", "Malia Campbell", "Elliott Hayes", "Jennifer Baker", "Arthur Johnson", "Abby Tucker", "Felix Ramos", "Juliette Mitchell", "Enzo Turner", "Bella Hill", "George West", "Leila Powell", "Alan Adams", "Jacqueline Hayes", "Dean Richardson", "Jane Foster", "Jeremy Washington", "Rylee Diaz", "Grant Campbell", "Nina Ramirez", "Gael Jenkins", "Emerson Turner", "Cash Johnson", "Ryan Martin", "Cade Scott", "Maria Thompson", "Zane Wood", "Raelynn Bell", "Kaiden Richardson", "Melody Peterson", "Theo Adams", "Michelle Hill", "Archer Richardson", "Lyla Foster", "Maddox Peterson", "Athena Campbell", "Alex Turner", "Kylee Diaz", "River Johnson", "Adaline Hayes", "Xander Washington", "Sara Baker", "Dean Robinson", "Aliyah Hayes"];

    private generateRandomName(): string {
        const randomIndex = Math.floor(Math.random() * this.names.length);
        return this.names[randomIndex];
    }

    private generateRandomCPF(): string {
        function generateRandomDigits(count: number): string {
            let result = "";
            for (let i = 0; i < count; i++) {
                result += Math.floor(Math.random() * 10).toString();
            }
            return result;
        }

        const cpfDigits = generateRandomDigits(9);
        const verifierDigit1 = this.calculateCPFVerifierDigit(cpfDigits);
        const verifierDigit2 = this.calculateCPFVerifierDigit(cpfDigits + verifierDigit1);

        return cpfDigits + verifierDigit1 + verifierDigit2;
    }

    private calculateCPFVerifierDigit(digits: string): string {
        const weightedSum = digits
            .split("")
            .map(Number)
            .reduce((sum, digit, index) => sum + digit * (10 - index), 0);

        const remainder = weightedSum % 11;
        return remainder < 2 ? "0" : (11 - remainder).toString();
    }

    generateRandomUser(): void {
        const civilStatus = ["solteiro(a)", "casado(a)"];
        const user = new User();
        user.id = Math.floor(Math.random() * 1000) + 1;
        user.name = this.generateRandomName();
        user.age = Math.floor(Math.random() * 50) + 20;
        const indexCivil = parseInt(String(Math.random() * civilStatus.length))
        user.civil_status = civilStatus[indexCivil];
        user.document = this.generateRandomCPF();
        user.document = Helpers.formatCpf(user.document);
        const localities = Helpers.getLocalities();
        const indexLocality = parseInt(String(Math.random() * localities.length));

        user.city = localities[indexLocality].city;
        user.state = localities[indexLocality].state;
        this.user = user;
    }

    async register(): Promise<void> {
        this.ajaxLoadService.showLoading();
        const result = await this.userModel.registerUser(this.user);
        this.response = result;
        this.ajaxLoadService.hideLoading();
        this.user = new User();
    }

    ngOnInit(): void {
    }
}
