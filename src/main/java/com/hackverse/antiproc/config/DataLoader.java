package com.hackverse.antiproc.config;

import com.hackverse.antiproc.model.Achievement;
import com.hackverse.antiproc.repository.AchievementRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Seeds the 6 badges from spec §8 if they don't already exist in the DB.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements CommandLineRunner {

    private final AchievementRepository achievementRepository;

    @Override
    public void run(String... args) {
        List<Achievement> badges = List.of(
                Achievement.builder()
                        .name("Premier Pas")
                        .description("Compléter sa 1ère session de concentration.")
                        .icon("🎯")
                        .bonusPoints(0)
                        .build(),
                Achievement.builder()
                        .name("En Feu")
                        .description("Compléter 3 sessions dans la même journée.")
                        .icon("🔥")
                        .bonusPoints(50)
                        .build(),
                Achievement.builder()
                        .name("Streak Master")
                        .description("5 sessions consécutives complètes sans abandon.")
                        .icon("⚡")
                        .bonusPoints(100)
                        .build(),
                Achievement.builder()
                        .name("Chasseur de tâches")
                        .description("Marquer 10 tâches comme DONE.")
                        .icon("✅")
                        .bonusPoints(80)
                        .build(),
                Achievement.builder()
                        .name("Top 3")
                        .description("Figurer dans le top 3 du classement général.")
                        .icon("🏆")
                        .bonusPoints(200)
                        .build(),
                Achievement.builder()
                        .name("Maître du Focus")
                        .description("Atteindre le niveau 5.")
                        .icon("🧠")
                        .bonusPoints(300)
                        .build()
        );

        for (Achievement badge : badges) {
            if (achievementRepository.findByName(badge.getName()).isEmpty()) {
                achievementRepository.save(badge);
                log.info("Badge '{}' créé.", badge.getName());
            }
        }
    }
}
